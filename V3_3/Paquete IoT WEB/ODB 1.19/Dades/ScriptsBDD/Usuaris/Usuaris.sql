USE [Usuaris]
GO
/****** Object:  Table [dbo].[Fabriques]    Script Date: 06/05/2020 18:27:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Fabriques](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nom] [nvarchar](100) NOT NULL,
	[Pais] [nvarchar](100) NOT NULL,
	[Continent] [nvarchar](100) NOT NULL,
	[X] [int] NULL,
	[Multilinia] [bit] NOT NULL,
	[ConnexioBd] [nvarchar](max) NULL,
	[Y] [int] NULL,
 CONSTRAINT [PK_Fabriques_] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tipus_Maquines]    Script Date: 06/05/2020 18:27:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tipus_Maquines](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nom] [varchar](100) NULL,
	[Ca] [varchar](100) NULL,
	[Es] [varchar](100) NULL,
	[En] [varchar](100) NULL,
	[MaquinaPrincipal] [varchar](100) NULL,
	[CapacitatProductiva] [int] NULL,
 CONSTRAINT [PK_Tipus_Maquines] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsuarisFabriques]    Script Date: 06/05/2020 18:27:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsuarisFabriques](
	[FabricaId] [int] NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_UsuarisFabriques] PRIMARY KEY CLUSTERED 
(
	[FabricaId] ASC,
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[UsuarisFabriques]  WITH CHECK ADD  CONSTRAINT [FK_UsuarisFabriques_AspNetUsers] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[UsuarisFabriques] CHECK CONSTRAINT [FK_UsuarisFabriques_AspNetUsers]
GO
ALTER TABLE [dbo].[UsuarisFabriques]  WITH CHECK ADD  CONSTRAINT [FK_UsuarisFabriques_Fabriques] FOREIGN KEY([FabricaId])
REFERENCES [dbo].[Fabriques] ([Id])
GO
ALTER TABLE [dbo].[UsuarisFabriques] CHECK CONSTRAINT [FK_UsuarisFabriques_Fabriques]
GO

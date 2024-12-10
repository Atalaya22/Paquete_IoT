GO
CREATE DATABASE NOM_DB
GO
USE NOM_DB
GO
/****** Object:  Table [dbo].[CFG_Festius]    Script Date: 13/05/2020 11:30:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CFG_Festius](
	[Data] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CFG_HorariProduccio]    Script Date: 22/04/2021 15:21:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CFG_HorariProduccio](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Nom] [varchar](100) NOT NULL,
    [Inici] [time](7) NOT NULL,
    [Final] [time](7) NOT NULL,
    [IntervalInici] [datetime] NULL,
    [IntervalFinal] [datetime] NULL,
    [Dilluns] [bit] NULL,
    [Dimarts] [bit] NULL,
    [Dimecres] [bit] NULL,
    [Dijous] [bit] NULL,
    [Divendres] [bit] NULL,
    [Dissabte] [bit] NULL,
    [Diumenge] [bit] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CFG_Linies]    Script Date: 13/05/2020 11:30:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CFG_Linies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nom] [nvarchar](100) NULL,
	[IpAxxon] [nvarchar](25) NULL,
	[NomServidorAxxon] [nvarchar](100) NULL
 CONSTRAINT [PK_CFG_Linies] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CFG_Maquines]    Script Date: 13/05/2020 11:30:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CFG_Maquines](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nom] [nvarchar](100) NOT NULL,
	[Linia] [int] NOT NULL,
	[Tipus] [int] NOT NULL,
	[Conjunt] [bit] NOT NULL,
	[Magatzems] [int] NULL,
	[Cameres] [nvarchar](30) NULL,
	[Ca] [nvarchar](100) NULL,
	[Es] [nvarchar](100) NULL,
	[En] [nvarchar](100) NULL,
 CONSTRAINT [PK_Maquines] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CFG_SubMaquines]    Script Date: 13/05/2020 11:30:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CFG_SubMaquines](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MaquinaPare] [int] NOT NULL,
	[Nom] [nvarchar](100) NOT NULL,
	[Tipus] [int] NOT NULL,
	[Ca] [nvarchar](100) NULL,
	[Es] [nvarchar](100) NULL,
	[En] [nvarchar](100) NULL,
	[Cameres] [nvarchar](30) NULL,
	[MaquinaVia] [int] NULL,
	[MaquinaMXP] [int] NULL,
 CONSTRAINT [PK_CFG_SubMaquines] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CFG_Torns]    Script Date: 13/05/2020 11:30:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CFG_Torns](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nom] [nvarchar](100) NOT NULL,
	[Inici] [time](7) NOT NULL,
	[Final] [time](7) NOT NULL,
	[Dilluns] [bit] NULL,
	[Dimarts] [bit] NULL,
	[Dimecres] [bit] NULL,
	[Dijous] [bit] NULL,
	[Divendres] [bit] NULL,
	[Dissabte] [bit] NULL,
	[Diumenge] [bit] NULL,
 CONSTRAINT [PK_CFG_Torns] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CI_Correus]    Script Date: 22/10/2021 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CI_Correus](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nom] [nvarchar](50) NULL,
	[IniciInforme] [time](7) NULL,
	[FinalInforme] [time](7) NULL,
	[Enviament] [nvarchar](100) NULL,
	[CorreuReceptor] [nvarchar](50) NULL,
	[Idioma] [nvarchar](50) NULL,
 CONSTRAINT [PK_CR_Correus] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CI_Idioma]    Script Date: 22/10/2021 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CI_Idioma](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nom] [nvarchar](50) NULL,
	[ca] [nvarchar](50) NULL,
	[es] [nvarchar](50) NULL,
	[en] [nvarchar](50) NULL,
 CONSTRAINT [PK_CR_Idioma] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[CI_Idioma] ([Nom], [Ca], [Es], [En]) VALUES (N'ca', N'Català', N'Catalán', N'Catalan')
INSERT [dbo].[CI_Idioma] ([Nom], [Ca], [Es], [En]) VALUES (N'es', N'Espanyol', N'Español', N'Spanish')
INSERT [dbo].[CI_Idioma] ([Nom], [Ca], [Es], [En]) VALUES (N'en', N'Anglès', N'Inglés', N'English')
GO

/****** Object:  Table [dbo].[Info_Estats]    Script Date: 22/10/2021 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Info_Estats](
	[Id] [int] NOT NULL,
	[Nom] [nvarchar](50) NULL,
	[Color] [nvarchar](50) NULL,
	[Ca] [nvarchar](50) NULL,
	[Es] [nvarchar](50) NULL,
	[En] [nvarchar](50) NULL,
 CONSTRAINT [PK_Info_Estats] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Info_Estats] ([Id], [Nom], [Color], [Ca], [Es], [En]) VALUES (0, N'UNKNOWN', N'purple', N'Desconegut', N'Desconocido', N'Unknown')
INSERT [dbo].[Info_Estats] ([Id], [Nom], [Color], [Ca], [Es], [En]) VALUES (1, N'Suspended', N'#3AC93A', N'Esperant', N'Esperando', N'Waiting')
INSERT [dbo].[Info_Estats] ([Id], [Nom], [Color], [Ca], [Es], [En]) VALUES (2, N'STOPPED', N'blue', N'Aturat', N'Parado', N'Stopped')
INSERT [dbo].[Info_Estats] ([Id], [Nom], [Color], [Ca], [Es], [En]) VALUES (3, N'RESETING', N'#f9feae', N'Restablint', N'Restableciendo', N'Reseting')
INSERT [dbo].[Info_Estats] ([Id], [Nom], [Color], [Ca], [Es], [En]) VALUES (4, N'EXECUTE', N'green', N'En funcionament', N'En funcionamiento', N'Running')
INSERT [dbo].[Info_Estats] ([Id], [Nom], [Color], [Ca], [Es], [En]) VALUES (5, N'FORMATCHANGE', N'#fec0df', N'Canvi de format', N'Cambio de formato', N'Format changing')
INSERT [dbo].[Info_Estats] ([Id], [Nom], [Color], [Ca], [Es], [En]) VALUES (6, N'ABORTED', N'red', N'Interromput', N'Interrumpido', N'Aborted')
INSERT [dbo].[Info_Estats] ([Id], [Nom], [Color], [Ca], [Es], [En]) VALUES (7, N'HELD', N'yellow', N'Retingut', N'Retenido', N'Held')
GO
/****** Object:  Table [dbo].[CFG_Botons]    Script Date: 12/08/2020 9:49:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CFG_Botons](
	[X] [int] NULL,
	[Y] [int] NULL,
	[Maquina] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ActualitzarServei](
	[id] [int] NULL,
	[Actualitzar] [int] NULL
) ON [PRIMARY]
GO

INSERT [dbo].[ActualitzarServei] ([id], [Actualitzar]) VALUES (1, 0)
GO

DROP TRIGGER IF EXISTS triggerActualitzarServei;
GO

CREATE TRIGGER triggerActualitzarServei
ON [dbo].[CI_Correus]
AFTER INSERT, DELETE, UPDATE
AS
BEGIN
UPDATE [dbo].[ActualitzarServei]
SET [Actualitzar] = 1;
END;

GO

/****** Object:  Table [dbo].[MXP_Sortida]    Script Date: 2/13/2021 9:36:09 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MXP_Sortida](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NULL,
	[Duracio] [time](7) NULL,
	[Final] [datetime] NULL,
	[EstatId] [tinyint] NULL,
	[InfoId] [smallint] NULL,
	[AlarmaId] [smallint] NULL,
	[MosaicId] [smallint] NULL,
	[PaletsTotals] [int] NULL,
 CONSTRAINT [PK_MXP_Sortida] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


/****** Object:  Table [dbo].[Temp_MXP_Sortida]    Script Date: 2/13/2021 9:35:47 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Temp_MXP_Sortida](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NULL,
	[EstatId] [tinyint] NULL,
	[InfoId] [smallint] NULL,
	[AlarmaId] [smallint] NULL,
	[MosaicId] [smallint] NULL,
	[PaletsTotals] [int] NULL,
 CONSTRAINT [PK_Temp_MXP_Sortida] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[MXP_Sortida_Cadencies]    Script Date: 2/13/2021 9:26:22 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MXP_Sortida_Cadencies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[Cadencia] [float] NOT NULL,
 CONSTRAINT [PK_MXP_Sortida_Cadencies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Info_MXP_Sortida_Productes]    Script Date: 2/13/2021 9:27:16 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Info_MXP_Sortida_Productes](
	[Id] [int] NOT NULL,
	[Nom] [varchar](max) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[IdIntern] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_Info_MXP_Sortida_Productes] PRIMARY KEY CLUSTERED 
(
	[IdIntern] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Info_MXP_Sortida_Alarmes]    Script Date: 2/13/2021 9:27:08 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Info_MXP_Sortida_Alarmes](
	[ID] [int] NOT NULL,
	[en] [varchar](255) NULL,
	[ca] [varchar](255) NULL,
	[fr] [varchar](255) NULL,
	[es] [varchar](255) NULL,
	[grup_en] [varchar](50) NULL,
	[grup_ca] [varchar](50) NULL,
	[grup_fr] [varchar](50) NULL,
	[grup_es] [varchar](50) NULL,
 CONSTRAINT [PK_Info_MXP_Sortida_Alarmes] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Info_MXP_Sortida_Info]    Script Date: 2/13/2021 9:26:59 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Info_MXP_Sortida_Info](
	[Id] [int] NOT NULL,
	[Ca] [varchar](max) NULL,
	[Es] [varchar](max) NULL,
	[En] [varchar](max) NULL,
 CONSTRAINT [PK_Info_MXP_Sortida_Info] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Info_MXP_Sortida_Estats]    Script Date: 2/13/2021 9:26:55 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Info_MXP_Sortida_Estats](
	[Id] [int] NOT NULL,
	[Nom] [varchar](100) NULL,
	[Color] [varchar](100) NULL,
	[Ca] [varchar](100) NULL,
	[Es] [varchar](100) NULL,
	[En] [varchar](100) NULL,
 CONSTRAINT [PK_Info_MXP_Sortida_Estats] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO